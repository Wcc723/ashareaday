import sublime
import threading
import os
import shutil

from .show_error import show_error
from .console_write import console_write
from .unicode import unicode_from_os
from .clear_directory import clear_directory
from .automatic_upgrader import AutomaticUpgrader
from .package_manager import PackageManager
from .package_renamer import PackageRenamer


class PackageCleanup(threading.Thread, PackageRenamer):
    """
    Cleans up folders for packages that were removed, but that still have files
    in use.
    """

    def __init__(self):
        self.manager = PackageManager()
        self.load_settings()
        threading.Thread.__init__(self)

    def run(self):
        found_pkgs = []
        installed_pkgs = self.installed_packages
        for package_name in os.listdir(sublime.packages_path()):
            package_dir = os.path.join(sublime.packages_path(), package_name)
            metadata_path = os.path.join(package_dir, 'package-metadata.json')

            # Cleanup packages that could not be removed due to in-use files
            cleanup_file = os.path.join(package_dir, 'package-control.cleanup')
            if os.path.exists(cleanup_file):
                try:
                    shutil.rmtree(package_dir)
                    console_write(u'Removed old directory for package %s' % package_name, True)

                except (OSError) as (e):
                    if not os.path.exists(cleanup_file):
                        open(cleanup_file, 'w').close()

                    error_string = (u'Unable to remove old directory for package ' +
                        u'%s - deferring until next start: %s') % (
                        package_name, unicode_from_os(e))
                    console_write(error_string, True)

            # Finish reinstalling packages that could not be upgraded due to
            # in-use files
            reinstall = os.path.join(package_dir, 'package-control.reinstall')
            if os.path.exists(reinstall):
                if not clear_directory(package_dir, [metadata_path]):
                    if not os.path.exists(reinstall):
                        open(reinstall, 'w').close()
                    # Assigning this here prevents the callback from referencing the value
                    # of the "package_name" variable when it is executed
                    restart_message = (u'An error occurred while trying to ' +
                        u'finish the upgrade of %s. You will most likely need to ' +
                        u'restart your computer to complete the upgrade.') % package_name

                    def show_still_locked():
                        show_error(restart_message)
                    sublime.set_timeout(show_still_locked, 10)
                else:
                    self.manager.install_package(package_name)

            # This adds previously installed packages from old versions of PC
            if os.path.exists(metadata_path) and \
                    package_name not in self.installed_packages:
                installed_pkgs.append(package_name)
                params = {
                    'package': package_name,
                    'operation': 'install',
                    'version': \
                        self.manager.get_metadata(package_name).get('version')
                }
                self.manager.record_usage(params)

            found_pkgs.append(package_name)

        sublime.set_timeout(lambda: self.finish(installed_pkgs, found_pkgs), 10)

    def finish(self, installed_pkgs, found_pkgs):
        """
        A callback that can be run the main UI thread to perform saving of the
        Package Control.sublime-settings file. Also fires off the
        :class:`AutomaticUpgrader`.

        :param installed_pkgs:
            A list of the string package names of all "installed" packages,
            even ones that do not appear to be in the filesystem.

        :param found_pkgs:
            A list of the string package names of all packages that are
            currently installed on the filesystem.
        """

        self.save_packages(installed_pkgs)
        AutomaticUpgrader(found_pkgs).start()
