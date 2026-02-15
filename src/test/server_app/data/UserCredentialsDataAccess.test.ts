import { DataBase } from '../../../app/server_app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server_app/data/UserCredentialsDataAccess';
import { Account } from '../../../app/server_app/model/AuthModel';

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
});

describe('UserCredentialsDataAccess', () => {
    let sut: UserCredentialsDataAccess;
    const fakeId = "1234";
    const someAccount: Account = {
        id: "",
        password: "somePassword",
        userName: "someUserName",
    }

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add user and return id', async () => {
        insertMock.mockResolvedValueOnce(fakeId);
        const actualId = await sut.addUser(someAccount);

        expect(insertMock).toHaveBeenCalledWith(someAccount);
        expect(actualId).toBe(fakeId);
    });

    it('should return user by id', async () => {
        getByMock.mockResolvedValueOnce(someAccount);
        const actual = await sut.getUserById(fakeId);
        expect(getByMock).toHaveBeenCalledWith('id', fakeId);
        expect(actual).toEqual(someAccount);
    });

    it('should return user by userName', async () => {
        getByMock.mockResolvedValueOnce(someAccount);
        const actual = await sut.getUserByUserName(someAccount.userName);
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
        expect(actual).toEqual(someAccount);
    });
});