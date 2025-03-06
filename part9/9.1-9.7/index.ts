import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const result = calculateBmi(height, weight);

    if (isNaN(height) || isNaN(weight)) {
        res.send({"error": "Malformatted parameters"});
    }
    
    res.send({
        "weight": weight,
        "height": height,
        "bmi": result 
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body
    try{
        if (!daily_exercises || isNaN(Number(target))) {
            res.status(400).send({ error: "malformatted parameters" })
        }
        if (daily_exercises && !isNaN(Number(target))) {
            res.send(calculateExercises(daily_exercises, Number(target)))
    }
    } catch (error) {
        let errorMessage = 'Parameters missing';
        if (error instanceof Error) {
            errorMessage += 'Error ' + error.message;
        }
        console.log(errorMessage);
        res.send({ "error": "Parameters missing" })
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err, _req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).send({ error: "Malformatted parameters, it should be an array and the target number" })
    }
    next()
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server running on http://localhost:${PORT}/hello`);
});