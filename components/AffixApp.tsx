import { ArrowNarrowUp } from 'tabler-icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';
import { authState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";


const AffixApp = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const { role } = useSelector(authState)

    if (role==="admin")
        return null

    else 
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
