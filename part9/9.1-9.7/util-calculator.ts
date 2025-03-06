interface bmiValues {
    height: number;
    weight: number;
}

export const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        } as bmiValues;
    }

    throw new Error('Provided values were not numbers!');
};