import axios from "axios";

export const getJudge0languageId = ( Language ) => {
	const languageMap = {
		"PYTHON": 71,
		"JAVA": 62,
		"JAVASCRIPT": 63,
		// "C++": 52,
	}

	return languageMap[Language.toUpperCase()]
}

export const submitBatch = async ( submissions ) => {	
	const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch`, 
		{submissions},
		{ 
			params: { 
				base64_encoded: false
				}
		}
	);

	console.log(`Submission result:`, JSON.stringify(data));
	
	return data; 
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async ( tokens ) => {	
	while(true){
		const data = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
			params: {
				tokens : tokens.join(","),
				base64_encoded: false,
			}
		})	
			
		const results = data.data.submissions;
		
		const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);

		if(isAllDone)
			return results;
		
		await sleep(1000);
	}
}