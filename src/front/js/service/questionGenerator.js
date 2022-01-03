const randomNumber = (limit) => Math.floor(Math.random() * limit);
const imageUrl = "https://www.artic.edu/iiif/2/";
const imageParams = "/full/843,/0/default.jpg";
const elasticSearchParams =
{
    "query": {
        "bool": {
            "must": [{
                "exists": {
                    "field": "artist_title"
                }
            },
            {
                "exists": {
                    "field": "image_id"
                }
            }
            ]
        }
    }
};
const encodedSearchParams = encodeURIComponent(JSON.stringify(elasticSearchParams));

const getData = () => {
    return fetch("https://api.artic.edu/api/v1/artworks/search?limit=100&fields=artist_title,id,title,image_id,style_title,date_end&params=" + encodedSearchParams)
        .then(resp => resp.json())
        .then(data => {
            const answerOne = data.data[randomNumber(data.data.length)];
            const answerTwo = data.data[randomNumber(data.data.length)];
            const answerThree = data.data[randomNumber(data.data.length)];

            return [
                answerOne, answerTwo, answerThree,
            ];
        })
};

export const getAuthorQuestion = (setStore) => {
    getData()
        .then(answers => {
            const correctAnswer = answers[randomNumber(answers.length)];
            setStore({
                question: {
                    answers: answers.map(answer => {
                        return {
                            objectID: answer.id, title: answer.artist_title,
                        }
                    }),
                    correctAnswer: {
                        objectID: correctAnswer.id, title: correctAnswer.artist_title,
                        image: imageUrl + correctAnswer.image_id + imageParams,
                    },
                    questionPrompt: "Who is the author?"
                }
            });

        })
        .catch(error => console.log("Error loading message from backend", error))
};

export const getPeriodQuestion = (setStore) => {
    getData()
        .then(answers => {
            const correctAnswer = answers[randomNumber(answers.length)];
            setStore({
                question: {
                    answers: answers.map(answer => {
                        return {
                            objectID: answer.id, title: answer.date_end,
                        }
                    }),
                    correctAnswer: {
                        objectID: correctAnswer.id,
                        image: imageUrl + correctAnswer.image_id + imageParams,
                        title: correctAnswer.date_end,
                    },
                    questionPrompt: "What is the period?"
                }
            });

        })
        .catch(error => console.log("Error loading message from backend", error))
};
export const getTitleQuestion = (setStore) => {
    getData()
        .then(answers => {
            const correctAnswer = answers[randomNumber(answers.length)];
            setStore({
                question: {
                    answers: answers.map(answer => {
                        return {
                            objectID: answer.id, title: answer.title,
                        }
                    }),
                    correctAnswer: {
                        objectID: correctAnswer.id,
                        image: imageUrl + correctAnswer.image_id + imageParams,
                        title: correctAnswer.title,
                    },
                    questionPrompt: "Which is the title?"
                }
            });

        })
        .catch(error => console.log("Error loading message from backend", error))
};
export const getArtMovementQuestion = (setStore) => {
    getData()
        .then(answers => {
            const correctAnswer = answers[randomNumber(answers.length)];
            setStore({
                question: {
                    answers: answers.map(answer => {
                        return {
                            objectID: answer.id, title: answer.style_title,
                        }
                    }),
                    correctAnswer: {
                        objectID: correctAnswer.id,
                        image: imageUrl + correctAnswer.image_id + imageParams,
                        title: correctAnswer.style_title,
                    },
                    questionPrompt: "Artistic movement?"
                }
            });

        })
        .catch(error => console.log("Error loading message from backend", error))
};