import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'futalis-footer',
  styleUrl: 'futalis-footer.scss',
  shadow: false,
})
export class FutalisFooter {
  /**
   * Current locale (en, de, etc.)
   */
  @Prop() locale: string = 'en';

  /**
   * Privacy policy URL
   */
  @Prop() privacyUrl: string = '/datenschutz';

  /**
   * Impressum URL
   */
  @Prop() impressumUrl: string = '/impressum';

  /**
   * Show newsletter link
   */
  @Prop() showNewsletter: boolean = false;

  /**
   * Phone number
   */
  @Prop() phoneNumber: string = '+49 341 392 987 9 0';

  /**
   * WhatsApp number
   */
  @Prop() whatsappNumber: string = '4934139298790';

  /**
   * Business hours
   */
  @Prop() businessHours: string = 'Mo - Fr: 9 - 17';

  /**
   * Show payment methods
   */
  @Prop() showPaymentMethods: boolean = true;

  /**
   * Copyright text
   */
  @Prop() copyrightText: string = '© futalis GmbH';

  @State() isMobile: boolean = false;

  /**
   * Event emitted when newsletter link is clicked
   */
  @Event() newsletterClick: EventEmitter<void>;

  componentWillLoad() {
    this.isMobile = window.innerWidth < 1025;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1025;
    });
  }


  render() {
    return (
      <div class="futalis-footer-wrapper">
        {/* Mobile Footer */}
        <div class="mobile footer">
          <div class="top-bar"></div>
          <p class="bold">Geprüfte Qualität</p>
          <div class="icons">
            <div class="footer-icon gmp"></div>
            <div class="footer-icon trusted"></div>
            <div class="footer-icon tuv"></div>
          </div>
          <div>
            <a href={this.privacyUrl} target="_blank">
              Datenschutz
            </a>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <a href={this.impressumUrl} target="_blank">
              Impressum
            </a>
            <br />
            <a href="javascript:void(0)" onClick={() => (window as any).UC_UI?.showSecondLayer()}>
              Cookie-Einstellungen
            </a>
            <br />
            {this.showNewsletter && (
              <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); this.newsletterClick.emit(); }}>
                Newsletteranmeldung
              </a>
            )}
          </div>
          <div class="contact">
            <a href={`tel:${this.phoneNumber.replace(/\s/g, '')}`}>
              <i class="fa-2x far fa-phone-alt"></i>
              <p>{this.phoneNumber}</p>
              <p>
                {this.businessHours} Uhr
              </p>
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${this.whatsappNumber}`}>
              <i class="fa-2x fab fa-whatsapp"></i>
              <p>{this.phoneNumber}</p>
              <p>
                {this.businessHours} Uhr
              </p>
            </a>
            <div style={{ clear: 'both' }}></div>
          </div>
          <p class="gray" style={{ padding: '5px 0 20px' }}>
            {this.copyrightText}
          </p>
        </div>

        {/* Desktop Footer */}
        <div class="desktop footer">
          <div class="top-bar"></div>
          <div class="main-container">
            <div class="left-container">
              <p>Kontakt</p>
              <div class="contact">
                <a href={`tel:${this.phoneNumber.replace(/\s/g, '')}`}>
                  <i class="fa-2x far fa-phone-alt"></i>
                  <p>{this.phoneNumber}</p>
                  <p>
                    {this.businessHours} Uhr
                  </p>
                </a>
                <a href={`https://api.whatsapp.com/send?phone=${this.whatsappNumber}`}>
                  <i class="fa-2x fab fa-whatsapp"></i>
                  <p>{this.phoneNumber}</p>
                  <p>
                    {this.businessHours} Uhr
                  </p>
                </a>
                <div style={{ clear: 'both' }}></div>
              </div>
            </div>
            <div class="middle-container">
              <p>Zahlungsarten</p>
              {this.showPaymentMethods && !this.isMobile && (
                <div class="payment-methods">
                  <img src="https://media.futalis.com/futalis/payone/payment-method-Visa.webp" alt="Visa" class="payment-icon" />
                  <img src="https://media.futalis.com/futalis/payone/payment-method-Mastercard.webp" alt="Mastercard" class="payment-icon" />
                  <img src="https://media.futalis.com/futalis/payone/payment-method-Paypal.webp" alt="PayPal" class="payment-icon" />
                  <img src="https://media.futalis.com/futalis/payone/payment-method-ELV-Sepa.webp" alt="SEPA" class="payment-icon" />
                  <img src="https://media.futalis.com/futalis/payone/payment-method-Rechnung.webp" alt="Rechnung" class="payment-icon" />
                  <img src="https://media.futalis.com/futalis/payone/payment-method-Vorkasse.webp" alt="Vorkasse" class="payment-icon" />
                </div>
              )}
            </div>
            <div class="right-container">
              <a href={this.privacyUrl} target="_blank">
                Datenschutz
              </a>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a href={this.impressumUrl} target="_blank">
                Impressum
              </a>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a href="javascript:void(0)" onClick={() => (window as any).UC_UI?.showSecondLayer()}>
                Cookie-Einstellungen
              </a>
              <br />
              {this.showNewsletter && (
                <a href="javascript:void(0)" class="newsletter" onClick={(e) => { e.preventDefault(); this.newsletterClick.emit(); }}>
                  Newsletteranmeldung
                </a>
              )}
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>
      </div>
    );
  }
}
