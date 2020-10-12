import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import useNavigateLink from "utils/hooks/useNavigateLink";

import { Preferences } from "constant";

import { userPreferences } from "../../ducks";
import IntroScreen from "../../screens/Intro";
import BottomTabNavigator from "./BottomTabNavigator";
import { ComponentsStyle } from "../../style";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
  ...ComponentsStyle.transitionBetweenScreenPresets,
};

const RootNavigator = (): React.ReactElement => {
  const hasAcceptedTermsOfUseVersion =
    Preferences.currentTermsOfUseVersion ===
    useSelector(userPreferences.selectors.getAcceptedTermsOfUseVersion);

  useNavigateLink({});

  return (
    <Stack.Navigator>
      {hasAcceptedTermsOfUseVersion ? (
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={screenOptions}
        />
      ) : (
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={screenOptions}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
