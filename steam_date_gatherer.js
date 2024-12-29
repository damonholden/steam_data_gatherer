try {
    const BASE_API_BASE_URL = "https://www.cheapshark.com/api/1.0/"
    const DEALS_API_PATH = "deals/"
    const GAMES_API_PATH = "games/"
    const PARAMS = new URLSearchParams({ storeID: 1, upperPrice: 15 }).toString()
    const deals_url = `${BASE_API_BASE_URL}${DEALS_API_PATH}?${PARAMS}`

    console.log(`making request to ${deals_url}`)

    fetch(deals_url).then((response) => {
        const response_json_body_parse_promise = response.json()
        // console.dir(response, { colors: true, depth: null });
        // console.log(response_json_body)
        return response_json_body_parse_promise
    }).then((parsed_response_json_body) => {
        const mapped_parsed_response_json_body = parsed_response_json_body.map((json) => {
            return { title, gameID, lastChange, salePrice } = json
        })
        
        const THREE_SECONDS_IN_MILLISECONDS = 3_000
        let api_request_buffer = 0
        for (const item of mapped_parsed_response_json_body) {
            setTimeout(() => {
                const game_url = `${BASE_API_BASE_URL}${GAMES_API_PATH_API_PATH}?id=${item.gameID}`
                fetch(game_url).then((game_info) => {
                    if (game_info.cheapestPriceEver < item.salePrice) {
                        return
                    }

                    console.log(item.title)
                })
            }, api_request_buffer += THREE_SECONDS_IN_MILLISECONDS)
        }
    })
} catch (cause) {
    console.error(new Error("failed to get cheap games lists", { cause }))
}