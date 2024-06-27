import {JSDOM} from 'jsdom'

export default defineEventHandler(async (evt) => {
    const {DICTIONARY_BASE_URL} = useRuntimeConfig(evt)
    const {word} = getQuery(evt)
    const url = new URL(DICTIONARY_BASE_URL)

    url.searchParams.set('p_p_id', 'com_ideit_ragportal_liferay_dictionary_NormalSearchPortlet')
    url.searchParams.set('p_p_lifecycle', '2')
    url.searchParams.set('p_p_state', 'normal')
    url.searchParams.set('p_p_mode', 'view')
    url.searchParams.set('p_p_cacheability', 'cacheLevelPage')
    url.searchParams.set('_com_ideit_ragportal_liferay_dictionary_NormalSearchPortlet_cmd', 'cmdNormalSearch')
    url.searchParams.set('_com_ideit_ragportal_liferay_dictionary_NormalSearchPortlet_renderMode', 'load')

    const {items} = await (await fetch(url, {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "body": `_com_ideit_ragportal_liferay_dictionary_NormalSearchPortlet_fieldSearchNoun=${word}`,
        "method": "POST",
    })).json()
    return items.map(({htmlContent}) => parseHTML(htmlContent))
})

function parseHTML(raw: string) {
    const dom = new JSDOM(raw)
    const document = dom.window.document

    const lemma = document.querySelector('.Lemma')?.getAttribute('data-lemma')
    const partOfSpeech = document.querySelector('.Subentry__Part_of_speech')?.textContent.trim()
    const definition = document.querySelector('.Definition__Definition')?.textContent.trim()
    const example = document.querySelector('.Example__Example')?.textContent.trim()
    const synonym = document.querySelector('.References .Reference')?.textContent.trim()

    return {
        lemma,
        partOfSpeech,
        definition,
        example,
        synonym
    }

}