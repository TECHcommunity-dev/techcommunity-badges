import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class HomePageBannerHeaderText extends Component {
  @service router;
  @service currentUser;

  get displayForUser() {
    return (this.currentUser);
  }
  
  get showOnRoute() {
    const path = this.router.currentURL;

    if (this.router.currentRouteName === `discovery.${defaultHomepage()}`) {
      return true;
    }
  }

  get shouldShow() {
    return this.displayForUser && this.showOnRoute;
  }

  get displayUserName() {
    //If User is not logged-in then return, Else proceed    
    if (!this.currentUser) {
      return;
    }

    if (this.currentUser) {
      //Get the banner text from the theme component settings (main_heading_content)
      let bannerTitleText = settings.main_heading_content;
      //Get the first name from the current User custom fields 
      let firstName = this.currentUser.custom_fields.user_field_6;
      //User First name present: then replace {First_name} with user's frist name.
      if (firstName) {
        bannerTitleText = bannerTitleText.replace('{First_name}', firstName);
      }
      //User first name not present: then replace {First_name} with "User" text.
      else {
        bannerTitleText.replace('{First_name}', "User");
      }
      
      return bannerTitleText;
    }
  }
}