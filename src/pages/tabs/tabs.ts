import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactsPage} from '../contacts/contacts';
import {HomePage} from '../home/home';
import {SettingsPage} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage;
  aboutPage = AboutPage;
  contactsPage = ContactsPage;
  settingsPage = SettingsPage;

  constructor() {

  }
}
