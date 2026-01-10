import axios from "axios"

export function getJudge0LanguageId(language:any){
    const languageMap:any = {
        "PYTHON" : 71,
        "JAVASCRIPT" : 63,
        "JAVA" : 62,
        "CPP" : 54,
        "GO" : 60
    }

    return languageMap[language.toUpperCase()]
}

export async function submitBatch(submissions:any){
    const {data} = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
        {submissions}
    )

    console.log("Batch submission response: ",data);

    return data;
    
}

export async function pollBatchResults(tokens:any){
    while(true){
        const {data}:any = axios.get(
            `${process.env.JUDGE0_API_URL}/submissions/batch`,
            {
                params:{
                    tokens: tokens.join(","),
                    base64_encoded:false
                }
            }
        )

        console.log(data);
        const results = data.submissions

        const isAllDone = results.every(
            (r:any) => r.status.id !== 1 && r.status.id !== 2
            );

            if (isAllDone) return results;

            setTimeout(()=>{},1000);

        
    }
}