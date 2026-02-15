import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
    id: string;
    name: string;
    color: string;
}

describe('Database', () => {
    let sut: DataBase<someTypeWithId>;
    const fakeId = "1234"
    const someObject1 = {
        id: "",
        name: "someName",
        color: "someColor"
    }
    const someObject2 = {
        id: "",
        name: "someOtherName",
        color: "someColor"
    }

    beforeEach(() => {
        sut = new DataBase<someTypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
    });

    it('should return id after insert', async () => {
        const id = await sut.insert(someObject1);
        expect(id).toBe(fakeId);
    });

    it('should return element after insert', async () => {
        const id = await sut.insert(someObject1);

        const actual = await sut.getBy('id', id);

        expect(actual).toEqual(someObject1);
    });

    it('should find all elements with same property', async () => {
        await sut.insert(someObject1);
        await sut.insert(someObject2);
        const expected = [someObject1, someObject2];

        const actual = await sut.findAllBy('color', 'someColor');

        expect(actual).toEqual(expected);
    });

    it('should change color of object', async () => {
        const id = await sut.insert(someObject1);
        const expectedColor = "updatedColor";
        await sut.update(id, "color", expectedColor);
        const actual = await sut.getBy('id', id);
        expect(actual.color).toEqual(expectedColor);
    });

    it('should delete element', async () => {
        const id = await sut.insert(someObject1);
        await sut.delete(id);
        const actual = await sut.getBy('id', id);
        expect(actual).toBeUndefined();
    });

    it('should return all elements', async () => {
        await sut.insert(someObject1);
        await sut.insert(someObject2);
        const expected = [someObject1, someObject2];
        const actual = await sut.getAllElements();
        expect(actual).toEqual(expected);
    });
});