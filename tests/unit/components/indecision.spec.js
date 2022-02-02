import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision'
describe('Indecision', () => {
    let wrapper
    let getAnswerSpy

    // Mock the fetch api, doesn't exist in node
    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }) )

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
    
    test('should run getAnswer', async () => {
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.attributes().src).toBe('https://yesno.wtf/assets/yes/2.gif')
        const answer = wrapper.find('h1')
        console.log(answer)
        // we cannot use find('h1') because isValidQuestion didn't change
        expect(wrapper.vm.answer).toBe('Si!')
    });
    
    test('should run error on getAnswer', async () => {
        // force the error
        fetch.mockImplementationOnce(() => Promise.reject('Error forced, ask the backend team?') )
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')
        expect(img.exists()).toBeFalsy() // or null, is the same
        expect(wrapper.vm.answer).toBe('Answer no se pudo cargar')
    });
});