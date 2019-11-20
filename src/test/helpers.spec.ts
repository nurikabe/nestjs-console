import { createSpinner, concatenateHelp } from '../helpers';

describe('Helpers', () => {
    it('should create an ora spinner', () => {
        const spinner = createSpinner({ text: 'hello' });
        expect(spinner).toBeDefined();
    });
    it('should concatenate the message with the help', () => {
        const concat = concatenateHelp('hello')('world');
        expect(concat).toEqual(`hello\nworld`);
    });
});
