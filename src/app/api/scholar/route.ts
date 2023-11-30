import { NextResponse } from 'next/server'
const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch(process.env.NEXT_PUBLIC_SERP_API)

const getScholarData = function ({ organic_results }: any) {
    return organic_results.map((result: any) => {
        const { title, link = "link not available", snippet, publication_info, inline_links, resources } = result;
        return {
            title,
            link
        };
    });
};

const getJson = (params: any) => {
    return new Promise((resolve) => {
        search.json(params, resolve);
    })
}




export async function GET(req: any, res: any) {
    const searchParams = req.nextUrl.searchParams.get("query")

    const params = {
        engine: "google_scholar",
        q: searchParams,
        hl: "en",
    };

    let jsonResults = await getJson(params);
    let scholarResults = await getScholarData(jsonResults);

    return NextResponse.json({
        results: scholarResults.slice(0, 5)
        // results: "hello"
    })
}
    


