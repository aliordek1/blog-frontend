// Gherkin anahtar kelimelerini (Given, When, Then) Cypress'e tanıtmak için
// Dikkat: 'And' import satırından kaldırıldı!
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// --- 1. ADIM (YEŞİL) ---
Given("kullanıcı {string} anasayfayı ziyaret eder", (url) => {
    cy.visit(url);
});

// --- 2. ADIM (YEŞİL) ---
When("kullanıcı {string} linkine tıklar", (linkText) => {
    cy.contains(linkText).click();
});

// --- 3. ADIM (YENİ EKLENEN KOD) ---
// Feature dosyasındaki 'And ...' adımı, bir 'When' adımını takip ettiği için
// burada 'When' olarak tanımlanır.
When("kullanıcı {string} alanına {string} yazar", (alanAdi, deger) => {
    // "Başlık" veya "İçerik" placeholder'ına sahip
    // elementi bul ve içine yaz.
    cy.get(`[placeholder="${alanAdi}"]`).type(deger);
});

// --- 4. ADIM (YENİ EKLENEN KOD) ---
// Feature: And kullanıcı "..." butonuna basar
// Bu da 'When' adımını takip ettiği için 'When' olarak tanımlanır.
When("kullanıcı {string} butonuna basar", (buttonText) => {
    // Cypress'e o metni içeren bir butonu bulmasını (cy.contains)
    // ve ona tıklamasını (click()) söylüyoruz.
    cy.contains("button", buttonText).click();
});

// --- THEN (YENİ EKLENEN KODLAR) ---

// Feature: Then kullanıcı "..." mesajını görmelidir
// Bu, 'Then' ile başladığı için 'Then' olarak tanımlanır.
Then("kullanıcı {string} mesajını görmelidir", (message) => {
    // Cypress'e o metni içeren bir elementi bulmasını söylüyoruz.
    cy.contains(message).should("be.visible");
});

// Feature: And kullanıcı "..." adresine yönlendirilmelidir
// Bu, 'Then' adımını takip ettiği için 'Then' olarak tanımlanır.
Then("kullanıcı {string} adresine yönlendirilmelidir", (url) => {
    // Cypress'e mevcut sayfa URL'sinin beklenen URL'i içermesini
    // kontrol etmesini söylüyoruz.
    cy.url().should("include", url);
});

// Feature: And kullanıcı "..." başlığını anasayfada görmelidir
// Bu da 'Then' adımını takip ettiği için 'Then' olarak tanımlanır.
Then("kullanıcı {string} başlığını anasayfada görmelidir", (title) => {
    // Cypress'e o metni içeren bir elementi bulmasını söylüyoruz.
    cy.contains(title).should("be.visible");
}); 