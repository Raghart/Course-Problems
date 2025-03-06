// import { parseArguments } from "./util-calculator";

export const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight / (height / 100) ** 2;
    if (bmi > 0 && bmi < 18.5) return "Underweight";
    else if (bmi>=18.5 && bmi<25) return "Normal weight";
    else if (bmi>=25 && bmi<30) return "Overweight";
    else if (bmi > 30) return "Obesity";
    return "Invalid BMI";
};

`
try {
    const {height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
    
} catch (error: unknown) {
    let errorMessage = 'Malformatted parameters';
    if (error instanceof Error) {
        errorMessage += 'Error ' + error.message;
    }
    console.log(errorMessage);
}
`