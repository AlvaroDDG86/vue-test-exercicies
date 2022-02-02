import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision'
describe('Indecision', () => {
    let wrapper
    let getAnswerSpy

    // Mock the fetch api, doesn't exist in node
    global.fetch = jest.fn()

    beforeEach(() => {
        wrapper = shallowMount(Indecision)
        getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        jest.clearAllMocks()
    })

    // Tests
    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
    
    test('should not fire fetch when typing', async () => {
        const inputModel = wrapper.find('[data-testid="input"')
        await inputModel.setValue('Hello world')
        expect(getAnswerSpy).not.toHaveBeenCalled()
    });

    test('should fire the fetch when type the "?"', async () => {
        const inputModel = wrapper.find('[data-testid="input"')
        await inputModel.setValue('Hello world?')
        expect(getAnswerSpy).toHaveBeenCalled()
    });
    
    test('should run getAnswer', () => {
        // TODO
    });
    
    test('should run error on getAnswer', () => {
        // TODO
    });
});