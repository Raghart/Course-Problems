import React from "react";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import '@testing-library/jest-dom';

test("Showing Todo activities working", () => {
    const todo = {
        text: "testing",
        done: "false"
    }
    render(<Todo text={todo.text} done={todo.done} />);
    expect(screen.getByText("Activity: testing, Done: false")).toBeInTheDocument();
})