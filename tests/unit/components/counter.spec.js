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
});
