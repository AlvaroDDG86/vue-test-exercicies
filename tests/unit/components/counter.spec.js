import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";


function factory(props) {
    return shallowMount(Counter, {
        ...props
    });
}

describe("Counter.vue", () => {
    beforeEach(() => {
    })
//   test("should match with the snapshot", () => {
//     expect(wrapper.html()).toMatchInlineSnapshot(`
//       <h2>Counter</h2>
//       <p>100 <sup>2</sup> = 10000</p>
//       <div class="actions"><button>+1</button><button>-1</button></div>
//     `);
//   });
    test('should render h2 tag with default value "Counter"', () => {
        const wrapper = factory()
        expect(wrapper.find('h2').text()).toBe('Counter')
    });
    
    test('should render h2 tag with prop title "prueba"', () => {
        const wrapper = factory({
            props: {
                title: 'Prueba'
            }
        })
        expect(wrapper.find('h2').text()).toBe('Prueba')
    });
    test('should show 100 in the second paragraph', () => {
        const wrapper = factory()

        expect(wrapper.find('[data-testid="second-p"]').text()).toBe('100')
    });

    test('should increase the counter by 1 on increase button click', async () => {
        const wrapper = factory()
        await wrapper.find('[data-testid="btn-increase"').trigger('click')
        expect(wrapper.find('[data-testid="second-p"]').text()).toBe('101')
    });
    
    test('should decrease the counter by 1 on decrease button click', async () => {
        const wrapper = factory()
        await wrapper.find('[data-testid="btn-decrease"').trigger('click')
        expect(wrapper.find('[data-testid="second-p"]').text()).toBe('99')
    });
});
