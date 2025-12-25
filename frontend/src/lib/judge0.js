export const getJudge0languageId = ( Language ) => {
	const languageMap = {
		"PYTHON": 71,
		"JAVA": 62,
		"JAVASCRIPT": 63,
		// "C++": 52,
	}

	return languageMap[Language.toUpperCase()]
}
