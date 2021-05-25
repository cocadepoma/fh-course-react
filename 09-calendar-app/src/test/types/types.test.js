import { types } from "../../types/types";

describe('pruebas en types', () => {

    test('los types deben de ser iguales', () => {

        expect(types).toEqual({

            uiOpenModal: "[UI] Open Modal",
            uiCloseModal: "[UI] Close Modal",

            eventSetActive: "[event] Set Active",
            eventStartAddNew: '[event] Start Add New',
            eventAddNew: "[event] Add New",
            eventClearActive: "[event] Clear Active",
            eventUpdate: "[event] Update",
            eventDelete: "[event] Delete",
            eventLoaded: "[event] Events Loaded",
            eventCleaner: "[event] Cleaner",

            dateSet: "[date] Set Date",
            dateClear: "[date] Clear Date",

            authCheckingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start Token Renew',
            authLogout: '[auth] Logout',

        });

    });

});
