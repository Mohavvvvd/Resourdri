from flask import Flask, request, jsonify
from sympy import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/solve', methods=['POST'])
def solve_equation():
    data = request.json
    equation = data.get('equation')
    equation = equation.replace('e^', 'exp').replace('^', '**')
    if(equation.find("log10")!=-1):
        ch = equation
        index_log10 = ch.find("log10")
        print(index_log10)
        substring = ch[index_log10:]
        print(substring)
        index_bracket = substring.find(")")
        print(index_bracket)
        modified_substring = substring[:index_bracket] + ",10" + substring[index_bracket:]
        print(modified_substring)
        modified_ch = ch.replace(substring, modified_substring)
        print(modified_ch)
        equation = modified_ch.replace("log10","log")
    print(equation)
    try:
        x = symbols('x')
        eq = sympify(equation)
        solutions = solve(eq, x)
        print(solutions)
        if solutions:
            solutions_str = [str(sol) for sol in solutions]
            return jsonify({'solution': solutions_str})
        else:
            return jsonify({'solution': 'No solution exists'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/signe', methods=['POST'])
def signe():
    data = request.json
    equation = data.get('equation')
    equation = equation.replace('e^', 'exp').replace('^', '**')

    if "log10" in equation:
        index_log10 = equation.find("log10")
        substring = equation[index_log10:]
        index_bracket = substring.find(")")
        modified_substring = substring[:index_bracket] + ",10" + substring[index_bracket:]
        equation = equation.replace(substring, modified_substring).replace("log10", "log")

    deb = data.get('deb')
    try:
        x = symbols('x')
        eq = sympify(equation)
        solutions = solve(eq, x)
        changes = ["-" if evaluate_expression(equation, deb) < 0.0000 else "+"]
        for root in solutions:
            print(evaluate_expression(equation, root + 0.1))
            changes.append("-" if evaluate_expression(equation, root + 0.1) < 0.0000 else "+")
        print(changes)
        return jsonify({'sign_changes': changes})
    except Exception as e:
        return jsonify({'error': str(e)})

def evaluate_expression(expression, x_value):
    x = symbols('x')
    expr = sympify(expression)
    result = expr.subs(x, x_value)
    result_real = nsimplify(result).evalf()
    return result_real


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)