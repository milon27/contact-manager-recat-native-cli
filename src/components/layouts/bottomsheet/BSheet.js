import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'

const BSheet = React.forwardRef(({ children }, ref) => {
    return (
        <>
            <RBSheet
                ref={ref}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "#000a"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                        padding: 20
                    }
                }}
            >
                {children}
            </RBSheet>
        </>
    )
})

export default BSheet

