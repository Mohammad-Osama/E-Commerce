import { ArrowNarrowUp } from 'tabler-icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';

const AffixApp = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
               rightIcon={<ArrowNarrowUp size={22}
                                         strokeWidth={3} 
                                         />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Top
              </Button>
            )}
          </Transition>
        </Affix>
    )
}

export default AffixApp
