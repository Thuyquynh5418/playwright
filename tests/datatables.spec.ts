import { test, expect } from '@playwright/test';

type Person = {
    lastName: string;
    firstName: string;
    due: number;
};

function getLargestDue(persons: Person[]): number {
    return Math.max(...persons.map(person => person.due));
}

test('Verify max due person is Jason Doe', async ({ page }) => {
    await page.goto('/tables');
    const table1 = page.locator('table#table1');
    const rows = table1.locator('tbody tr');
    const persons: Person[] = [];

    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const cells = row.locator('td');
        persons.push({
            lastName: (await cells.nth(0).textContent())?.trim() || '',
            firstName: (await cells.nth(1).textContent())?.trim() || '',
            due: parseFloat((await cells.nth(3).textContent())?.replace('$', '').replace(',', '') || '0')
        });
    }

    const maxDueValue = getLargestDue(persons);
    const maxDueListPerson = persons
        .filter(person => person.due === maxDueValue)
        .map(person => `${person.firstName} ${person.lastName}`);
    expect(maxDueListPerson).toEqual(['Jason Doe']);
});