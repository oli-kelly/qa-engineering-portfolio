package uk.co.olikelly.qa.tests;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import uk.co.olikelly.qa.pages.CheckoutPage;

final class GuestCheckoutTest {
    private WebDriver driver;

    @BeforeEach
    void startBrowser() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--window-size=1440,1000");
        driver = new ChromeDriver(options);
    }

    @AfterEach
    void stopBrowser() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void guestCanApplyPromotionAndPlaceOrder() {
        String baseUrl = System.getProperty("baseUrl", "http://127.0.0.1:4173");
        CheckoutPage checkout = new CheckoutPage(driver)
                .open(baseUrl)
                .selectProduct("course-bdd")
                .setQuantity(2)
                .applyPromotion("SENIORQA");

        assertAll(
                () -> assertEquals("15% discount applied.", checkout.promotionMessage()),
                () -> assertEquals("-£7.50", checkout.discount())
        );

        checkout.checkoutAs("selenium@example.test");
        assertEquals("£42.48", checkout.confirmedTotal());
    }
}
