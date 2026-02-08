/**
 * Quran Website - Single Page Application
 * Professional routing and content management
 */

(function() {
    'use strict';

    // Application State
    const AppState = {
        currentPage: 'home',
        currentSurah: null,
        currentAyat: null,
        showArabic: true,
        showEnglish: true,
        showTransliteration: false,
        searchResults: []
    };

    // Router - handles hash-based navigation
    const Router = {
        init: function() {
            window.addEventListener('hashchange', this.handleRoute.bind(this));
            window.addEventListener('load', this.handleRoute.bind(this));
        },

        handleRoute: function() {
            const hash = window.location.hash.slice(1) || 'home';
            const [page, param1, param2] = hash.split('/');
            
            AppState.currentPage = page;
            
            switch(page) {
                case 'home':
                    PageController.renderHome();
                    break;
                case 'quran':
                    PageController.renderQuranList();
                    break;
                case 'surah':
                    AppState.currentSurah = parseInt(param1) - 1 || 0;
                    AppState.currentAyat = parseInt(param2) || null;
                    PageController.renderSurah(AppState.currentSurah, AppState.currentAyat);
                    break;
                case 'translator':
                    PageController.renderTranslator();
                    break;
                case 'topic':
                    PageController.renderTopic(param1);
                    break;
                default:
                    PageController.renderHome();
            }
        },

        navigate: function(path) {
            window.location.hash = path;
        }
    };

    // Page Controller - manages page rendering
    const PageController = {
        renderHome: function() {
            const content = `
                <div class="ayatBox" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color: white; text-align: center; border-left: none;">
                    I seek protection for ALLAH from accursed devil<br><br>
                    In the Name for ALLAH the Most Beneficent, the Most Merciful
                </div>
                <br>
                ${this.renderNavigation()}
                ${this.renderSearchForm('Quran')}
                <a href="#topic/Strict-Monotheism" class="button skyBlueButton">Strict Monotheism</a>
                <a href="#topic/Righteousness" class="button skyBlueButton">Righteousness</a>
                <a href="#topic/Sincerity" class="button skyBlueButton">Sincerity</a>
                <br>
                <a href="#menu" class="button skyBlueButton">Top</a>
            `;
            document.getElementById('content').innerHTML = content;
        },

        renderQuranList: function() {
            let surahListHTML = '<div id="surah">';
            for (let i = 0; i < 114; i++) {
                surahListHTML += `
                    <a href="#surah/${i + 1}" class="button skyBlueButton">
                        ${i + 1}. ${surah[i].englishTransliteration} ${surah[i].englishTranslation} (${surah[i].ayat} verses)
                    </a>`;
            }
            surahListHTML += '</div>';

            const content = `
                <div class="ayatBox" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color: white; text-align: center; border-left: none;">
                    I seek protection for ALLAH from accursed devil<br><br>
                    In the Name for ALLAH the Most Beneficent, the Most Merciful
                </div>
                <br>
                ${this.renderNavigation()}
                ${this.renderSearchForm('Quran')}
                ${this.renderSurahNavigator()}
                ${surahListHTML}
                <br>
                <a href="#menu" class="button skyBlueButton">Top</a>
            `;
            document.getElementById('content').innerHTML = content;
        },

        renderSurah: function(surahIndex, ayatNumber) {
            const surahData = surah[surahIndex];
            const arabicData = arabicQuran[surahIndex];
            const englishData = englishQuran[surahIndex];
            const transliterationData = typeof transliterationQuran !== 'undefined' ? transliterationQuran[surahIndex] : null;

            let ayatHTML = '';
            for (let i = 0; i < surahData.ayat; i++) {
                let arabicText = AppState.showArabic ? arabicData.ayat[i].text + '<br><br>' : '';
                let transliterationText = AppState.showTransliteration && transliterationData ? 
                    transliterationData.ayat[i].text + '<br><br>' : '';
                let englishText = AppState.showEnglish ? englishData.ayat[i].text : '';

                ayatHTML += `
                    <div class="ayatBox" id="ayat${i + 1}">
                        <strong>(${surahIndex + 1}:${i + 1})</strong> &nbsp;
                        ${arabicText}
                        ${transliterationText}
                        ${englishText}
                    </div><br>
                `;
            }

            const prevButton = surahIndex > 0 ? 
                `<a href="#surah/${surahIndex}" class="button skyBlueButton">${surah[surahIndex - 1].englishTransliteration}</a>` : '';
            const nextButton = surahIndex < 113 ? 
                `<a href="#surah/${surahIndex + 2}" class="button skyBlueButton">${surah[surahIndex + 1].englishTransliteration}</a>` : '';

            const content = `
                <div class="ayatBox" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color: white; text-align: center; border-left: none;">
                    I seek protection for ALLAH from accursed devil<br><br>
                    In the Name for ALLAH the Most Beneficent, the Most Merciful
                </div>
                <br>
                ${this.renderNavigation()}
                ${this.renderSearchForm('this surah')}
                ${this.renderSurahNavigator(surahIndex + 1)}
                <button class="button skyBlueButton" onclick="AppController.toggleArabic()">
                    ${AppState.showArabic ? 'Hide' : 'Show'} Arabic Text
                </button>
                <button class="button skyBlueButton" onclick="AppController.toggleTransliteration()">
                    ${AppState.showTransliteration ? 'Hide' : 'Show'} Transliteration
                </button>
                <button class="button skyBlueButton" onclick="AppController.toggleEnglish()">
                    ${AppState.showEnglish ? 'Hide' : 'Show'} English Text
                </button>
                <br>
                <button class="button whiteButton">Surah ${surahData.englishTransliteration}</button>
                <div id="ayat">
                    ${ayatHTML}
                </div>
                <div id="surahPage">
                    ${prevButton}
                    ${nextButton}
                </div>
                <br>
                <a href="#menu" class="button skyBlueButton">Top</a>
            `;
            document.getElementById('content').innerHTML = content;

            // Scroll to specific ayat if provided
            if (ayatNumber) {
                setTimeout(() => {
                    const ayatElement = document.getElementById('ayat' + ayatNumber);
                    if (ayatElement) {
                        ayatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        ayatElement.style.backgroundColor = '#fffbcc';
                        setTimeout(() => {
                            ayatElement.style.backgroundColor = '';
                        }, 2000);
                    }
                }, 100);
            }
        },

        renderTranslator: function() {
            const content = `
                <div class="ayatBox" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color: white; text-align: center; border-left: none;">
                    I seek protection for ALLAH from accursed devil<br><br>
                    In the Name for ALLAH the Most Beneficent, the Most Merciful
                </div>
                <br>
                ${this.renderNavigation()}
                ${this.renderSearchForm('Quran')}
                <div class="ayatBox">
                    <h2>Translator Information</h2>
                    <p>As you can see in this site's header, we have our own private English translation of Quran.</p>
                    <p>We find Ali Quli Qarai's translation has less incorrect translations of ambiguous arabic words that downgrading strict monotheism.</p>
                    <p>This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by <a href="http://tanzil.net/">Tanzil.net</a> or any of its affiliates or subsidiaries. This is an independent and unofficial library.</p>
                    <p>By using this Quran text from <a href="http://tanzil.net/">Tanzil.net</a> you agree to Tanzil's terms of use:</p>
                    <pre style="background: #f5f5f0; padding: 1rem; border-radius: 8px; overflow-x: auto;">
#  - This quran text is distributed under the terms of a
#    Creative Commons Attribution 3.0 License.
#
#  - Permission is granted to copy and distribute verbatim copies
#    of this text, but CHANGING IT IS NOT ALLOWED.
#
#  - This quran text can be used in any website or application,
#    provided its source (Tanzil.net) is clearly indicated, and
#    a link is made to http://tanzil.net to enable users to keep
#    track of changes.
#
#  - This copyright notice shall be included in all verbatim copies
#    of the text, and shall be reproduced appropriately in all files
#    derived from or containing substantial portion of this text.
                    </pre>
                </div>
                <br>
                <a href="#menu" class="button skyBlueButton">Top</a>
            `;
            document.getElementById('content').innerHTML = content;
        },

        renderTopic: function(topicName) {
            // This would require loading topic-specific content
            // For now, redirect to the HTML files
            window.location.href = topicName + '.html';
        },

        renderNavigation: function() {
            return `
                <a href="#home" class="button skyBlueButton">Home</a>
                <a href="#quran" class="button skyBlueButton">Quran</a>
                <a href="#translator" class="button skyBlueButton">Translator</a>
            `;
        },

        renderSearchForm: function(searchType) {
            return `
                <form onsubmit="AppController.search(event)" style="background-color: var(--surface); padding: 1.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow); margin: 1rem 0;">
                    Search by letters in ${searchType}
                    <input type="text" id="searchInput" minlength="3" maxlength="45" required>
                    <button type="submit" class="icon" style="background: none; border: none; padding: 0;">
                        <img src="img/search.png" alt="Search" class="icon">
                    </button>
                    <br>
                    <span style="color: var(--primary-color); font-size: 0.9rem;">
                        (to search multiple words in exact order, add _ between them)
                    </span>
                </form>
            `;
        },

        renderSurahNavigator: function(currentSurah) {
            const surahValue = currentSurah || 1;
            const maxAyat = surah[surahValue - 1].ayat;
            
            return `
                <form onsubmit="AppController.goToSurah(event)" style="background-color: var(--surface); padding: 1.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow); margin: 1rem 0;">
                    Surah #: 
                    <input type="number" id="surahNumber" min="1" max="114" value="${surahValue}" required onchange="AppController.updateMaxAyat()">
                    Ayat #: 
                    <input type="number" id="ayatNumber" min="1" max="${maxAyat}" value="1" required>
                    <button type="submit" class="icon" style="background: none; border: none; padding: 0;">
                        <img src="img/search.png" alt="Go" class="icon">
                    </button>
                </form>
            `;
        }
    };

    // Application Controller - handles user interactions
    window.AppController = {
        search: function(event) {
            event.preventDefault();
            const searchTerm = document.getElementById('searchInput').value;
            // Reuse existing search functionality
            document.getElementById('searchAyat').value = searchTerm;
            if (typeof searchAyat === 'function') {
                searchAyat();
            }
        },

        goToSurah: function(event) {
            event.preventDefault();
            const surahNum = document.getElementById('surahNumber').value;
            const ayatNum = document.getElementById('ayatNumber').value;
            Router.navigate(`surah/${surahNum}/${ayatNum}`);
        },

        updateMaxAyat: function() {
            const surahNum = document.getElementById('surahNumber').value;
            const ayatInput = document.getElementById('ayatNumber');
            if (surahNum && ayatInput) {
                ayatInput.max = surah[surahNum - 1].ayat;
            }
        },

        toggleArabic: function() {
            AppState.showArabic = !AppState.showArabic;
            PageController.renderSurah(AppState.currentSurah, AppState.currentAyat);
        },

        toggleEnglish: function() {
            AppState.showEnglish = !AppState.showEnglish;
            PageController.renderSurah(AppState.currentSurah, AppState.currentAyat);
        },

        toggleTransliteration: function() {
            AppState.showTransliteration = !AppState.showTransliteration;
            PageController.renderSurah(AppState.currentSurah, AppState.currentAyat);
        }
    };

    // Initialize the application
    Router.init();
})();
