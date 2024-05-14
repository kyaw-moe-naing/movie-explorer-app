module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          app: './src/app',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          types: './src/types',
          utils: './src/utils',
        },
      },
    ],
  ],
};
