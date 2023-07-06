import UniqueEntityid from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from 'lodash';

describe("Category Unit Tests", () => {

    test('constructor of category', () => {
        let category = new Category({name: 'Movie'});

        let props = omit(category.props, 'created_at');

        expect(props).toStrictEqual({
            name: 'Movie', 
            description: null, 
            is_active: true, 
        });

        expect(category.props.created_at).toBeInstanceOf(Date);

        category = new Category({
            name: 'Movie',
            description: 'some description',
            is_active: false,
        });

        let created_at = new Date();
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'some description',
            is_active: false,
            created_at
        });

        category = new Category({
            name: 'Movie',
            description: 'other description',
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'other description',
        });

        category = new Category({
            name: 'Movie',
            is_active: true,
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true
        });

        created_at = new Date();
        category = new Category({
            name: 'Movie',
            created_at
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at
        });
    });

    test('id field', () => {

        type CategoryData = { props: CategoryProperties; id?: UniqueEntityid };

        const data: CategoryData[] = [
            { props: {name: "Movie" }},
            { props: {name: "Movie" }, id: null},
            { props: {name: "Movie" }, id: undefined},
            { props: {name: "Movie" }, id: new UniqueEntityid() },
        ]

        data.forEach( i => {
            let category = new Category(i.props, i.id as any);
            expect(category.id).not.toBeNull();
            expect(category.id).toBeInstanceOf(UniqueEntityid);   
        });

    });

    test('get of name field', () => {
        const category = new Category({name: 'Movie'});
        expect(category.name).toBe('Movie');
    });

    test('get and setter of description field', () => {
        let category = new Category({name: 'Movie'});

        expect(category.description).toBeNull();

        category = new Category({
            name: "Movie",
            description: "some description",
        });

        expect(category.description).toBe("some description");

        category = new Category({
            name: 'Movie'
        });

        category['description'] = 'other description';
        expect(category.description).toBe('other description');

        category['description'] = undefined;
        expect(category.description).toBeNull();

        category['description'] = null;
        expect(category.description).toBeNull();
        
    });

    test('getter and setter is_actived prop', () => {

        let category = new Category({
            name: "Movie"
        })

        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
            is_active: true
        })

        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
            is_active: false
        })

        expect(category.is_active).toBeFalsy();

    });

    test('getter and setter create_at prop', () => {

        let category = new Category({
            name: "Movie"
        });

        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: "Movie",
            created_at,
        });

        expect(category.created_at).toBe(created_at);


    });

});

