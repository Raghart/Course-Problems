export const parseNumbers = (args: string[]) => {
    if (args.length < 5) throw new Error('Not enough arguments');

    const target = Number(args[2]);

    const array = [];
    for (let i=3; i < args.length; i++){
        array.push(Number(args[i]));
    }

    if (!isNaN(target) && !array.some(isNaN)) {
        return {
            array: array,
            target: target
        };
    } 

    throw new Error('Provided values were not numbers!');
};