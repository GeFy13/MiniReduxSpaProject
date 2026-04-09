import { Router } from "../src/routes/routes"

describe('Тесты маршрутизации', () => {
    let result;

    const ResultStrings = {
        HOME: `Вызван путь '/' без параметров`,
        ADD: `Вызван путь '/add' без параметров`,
        EDIT: (param) => `Вызван путь '/edit/:id' c парметром: ${param}`,
    }

    const router = new Router([
        { path: '/', handler: homeFunc },
        { path: '/add', handler: addFunc },
        { path: '/edit/:id', handler: editFunc },    
        { path: '*', handler: () => router.navigate('/') }
    ])

    function homeFunc() {
        result = ResultStrings.HOME
    }
    
    function addFunc() {
        result = ResultStrings.ADD
    }
    
    function editFunc(param) {
        result = ResultStrings.EDIT(param)
    }

    test('Маршрутизация без параметра', () => {
        router.navigate('/');
        expect(result).toBe(ResultStrings.HOME);
        
        router.navigate('/add');
        expect(result).toBe(ResultStrings.ADD);
    });

    test('Маршрутизация с параметром', () => {
        const id = 100;
        router.navigate(`/edit/${id}`);
        expect(result).toBe(ResultStrings.EDIT({ id: id }));
    });
    
    test('Маршрутизация по неизвестному пути', () => {
        router.navigate('/show');
        expect(result).toBe(ResultStrings.HOME);
    })
}) 