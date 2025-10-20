import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'futalis-header',
  styleUrl: 'futalis-header.scss',
  shadow: false,
})
export class FutalisHeader {
  /**
   * Item count for the cart badge
   */
  @Prop() itemCount: number = 0;

  /**
   * Whether the user is logged in
   */
  @Prop() isLoggedIn: boolean = false;

  /**
   * User's first name (shown when logged in)
   */
  @Prop() userName: string = '';

  /**
   * Is the user a partner
   */
  @Prop() isPartner: boolean = false;

  /**
   * Menu items array
   */
  @Prop() menuItems: Array<{ name: string; url: string; content?: string }> = [];

  /**
   * Show mini cart
   */
  @Prop() showMiniCart: boolean = false;

  /**
   * Current locale (en, de, etc.)
   */
  @Prop() locale: string = 'en';

  /**
   * Home URL
   */
  @Prop() homeUrl: string = '/';

  /**
   * FAQ URL
   */
  @Prop() faqUrl: string = '/ueber-futalis/service/faq';

  /**
   * Customer account URL
   */
  @Prop() customerAccountUrl: string = '/customer/account/home';

  /**
   * Interface/vet login URL
   */
  @Prop() interfaceUrl: string = '/interface';

  @State() showMenu: boolean = false;
  @State() showSub: Array<boolean> = [];
  @State() isMobile: boolean = false;

  /**
   * Event emitted when logo is clicked
   */
  @Event() logoClick: EventEmitter<void>;

  /**
   * Event emitted when cart icon is clicked
   */
  @Event() cartClick: EventEmitter<void>;

  /**
   * Event emitted when menu item is clicked
   */
  @Event() menuItemClick: EventEmitter<{ index: number; url: string }>;

  componentWillLoad() {
    this.isMobile = window.innerWidth <= 1024;
    this.showSub = this.menuItems.map(() => false);

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 1024;
    });
  }

  private handleLogoClick = () => {
    this.logoClick.emit();
  };


  render() {
    return (
      <div class="futalis-header-wrapper">
        {/* Mobile Header */}
        <div class="mobile header" aria-hidden={!this.isMobile}>
          <div class="wide-container">
            <div class="middle-container">
              <a class="logo" onClick={this.handleLogoClick}>
                futalis<span>&reg;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div class="desktop header" aria-hidden={this.isMobile}>
          <div class="wide-container">
            <div class="top-bar"></div>
            <div class="main-container">
              <div class="left-container">
                <div class="icons">
                  <div class="header-icon uni light"></div>
                  <div class="header-icon gmp small light"></div>
                  <div class="header-icon trusted small light"></div>
                  <div class="header-icon tuv small light"></div>
                </div>
              </div>
              <div class="middle-container">
                <a class="logo" onClick={this.handleLogoClick}>
                  futalis<span>&reg;</span>
                </a>
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
