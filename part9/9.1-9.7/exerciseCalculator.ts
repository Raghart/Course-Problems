// import { parseNumbers } from "./util-exercise";

interface exerciseValues {
    periodLength: number;
    trainingDays: number;
    sucess: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyExercises: Array<number>, target: number): exerciseValues => {
    const trainedDays = dailyExercises.filter(day => day !== 0);
    const average = dailyExercises.reduce((acc, value) => acc + value) / dailyExercises.length;
    const getRating = (average: number): number => {
        if (average >= target) return 3;
        else if (average > (target * 0.10) && average < target) return 2;
        else if (average < (target * 0.10)) return 1;
        return 0;
    };

    const ratingDescription = (rating: number ): string => {
        if (rating === 3) return "The objective was achived!";
        else if (rating === 2) return "You did it well, but not well enough...";
        else if (rating === 1) return "That's all you got?";
        return "Invalid rating";
    };

    const rating = getRating(average);

    return {
        periodLength: dailyExercises.length,
        trainingDays: trainedDays.length,
        sucess: (rating === 3) ? true : false,
        rating: rating,
        ratingDescription: ratingDescription(rating),
        target: target,
        average: average,
    };
};

`
try {
    const {array, target} = parseNumbers(process.argv);
    console.log(calculateExercises(array, target));
    
} catch (error) {
    let errorMessage = 'Malformatted parameters';
    if (error instanceof Error) {
        errorMessage += 'Error ' + error.message;
    }
    console.log(errorMessage);
}
`