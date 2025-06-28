import { test, expect } from '@playwright/test';
import { log } from 'console';
const persons: Person[] = [];
type Person = {
    lastName: string;
    firstName: string;
    due: number;
};

test.beforeEach(async ({page}) => {
    await page.goto('/tables');
    const table1 = await page.locator('table#table1');
    const rows = await table1.locator('tbody tr');
    

    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const cells = row.locator('td');
        // const firstName = await cells.nth(0).innerText();
        // console.log(firstName);

        persons.push({
            lastName: (await cells.nth(0).textContent())?.trim() || '',
            firstName: (await cells.nth(1).textContent())?.trim() || '',
            due: parseFloat((await cells.nth(3).textContent())?.replace('$', '') || '0')
        });

        console.log(persons[i]);
    }

});


test('Verify max due person is Jason Doe', async ({ page }) => {
    function getLargestDue(persons: Person[]): number {
    return Math.max(...persons.map(person => person.due));
}
    const maxDueValue = getLargestDue(persons);
    const maxDueListPerson = persons
        .filter(person => person.due === maxDueValue)
        .map(person => `${person.firstName} ${person.lastName}`);
    
    expect(maxDueListPerson).toEqual(['Jason Doe']);
});