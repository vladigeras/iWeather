import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactsPage} from '../contacts/contacts';
import {HomePage} from '../home/home';
import {SettingsPage} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  static tabsPrototypes = [];

  homePage = HomePage;
  aboutPage = AboutPage;
  contactsPage = ContactsPage;
  settingsPage = SettingsPage;

  constructor() {
    TabsPage.tabsPrototypes.push(HomePage.prototype, AboutPage.prototype, ContactsPage.prototype, SettingsPage.prototype);
  }

  public static getIndexOfTabByPrototype(className) {
    return TabsPage.tabsPrototypes.indexOf(className);
  }
}
