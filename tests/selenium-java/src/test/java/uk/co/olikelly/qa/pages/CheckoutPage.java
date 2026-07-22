package uk.co.olikelly.qa.pages;

import java.time.Duration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public final class CheckoutPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(css = "[data-testid='product']")
    private WebElement product;

    @FindBy(css = "[data-testid='quantity']")
    private WebElement quantity;

    @FindBy(css = "[data-testid='promo-code']")
    private WebElement promoCode;

    @FindBy(css = "[data-testid='apply-promo']")
    private WebElement applyPromo;

    @FindBy(css = "[data-testid='email']")
    private WebElement email;

    @FindBy(css = "[data-testid='place-order']")
    private WebElement placeOrder;

    @FindBy(id = "promo-status")
    private WebElement promoStatus;

    @FindBy(id = "discount")
    private WebElement discount;

    @FindBy(css = "[data-testid='confirmation-total']")
    private WebElement confirmationTotal;

    public CheckoutPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        PageFactory.initElements(driver, this);
    }

    public CheckoutPage open(String baseUrl) {
        driver.get(baseUrl);
        wait.until(ExpectedConditions.textToBePresentInElement(product, "BDD Field Guide"));
        return this;
    }

    public CheckoutPage selectProduct(String value) {
        new Select(product).selectByValue(value);
        return this;
    }

    public CheckoutPage setQuantity(int value) {
        quantity.clear();
        quantity.sendKeys(String.valueOf(value));
        return this;
    }

    public CheckoutPage applyPromotion(String code) {
        promoCode.sendKeys(code);
        applyPromo.click();
        return this;
    }

    public CheckoutPage checkoutAs(String address) {
        email.sendKeys(address);
        placeOrder.click();
        return this;
    }

    public String promotionMessage() {
        return promoStatus.getText();
    }

    public String discount() {
        return discount.getText();
    }

    public String confirmedTotal() {
        return wait.until(ExpectedConditions.visibilityOf(confirmationTotal)).getText();
    }
}
