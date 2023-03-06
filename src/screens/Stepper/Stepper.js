import React,{useState} from 'react'
import { Text, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

export const Stepper = () => {

   const [state,setState] = useState(0)

 const onNextStep = () => {
      setState(1)
    };

  return (
        <View style={{ flex: 1,width:'100%' }}>
        <ProgressSteps>
   
          <ProgressStep label="First Step" onNext={()=>onNextStep()}>
            <View style={{ alignItems: 'center' }}>
              <Text>This is the content within step 1!</Text>
            </View>
          </ProgressStep>
          
          <ProgressStep label="Second Step" removeBtnRow={true}>
            <View style={{ alignItems: 'center' }}>
              <Text>This is the content within step 2!</Text>
            </View>
          </ProgressStep>
        
        </ProgressSteps>
      </View>
  
  )
}
