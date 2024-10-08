import React, { createContext, useState, useEffect, useContext } from 'react';


const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pizzas");
                if (!response.ok) {
                    throw new Error('Error en API');
                }
                const data = await response.json();
                setPizzas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return (
        <PizzaContext.Provider value={{ pizzas, loading, error }}>
            {children}
        </PizzaContext.Provider>
    );
};


export const usePizza = () => useContext(PizzaContext);