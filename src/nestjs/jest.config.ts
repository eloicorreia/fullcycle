const fc_micro_videos_path = "<rootDir>/../../../node_modules/@fc/micro-videos/dist";

export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageProvider: 'v8',
  coverageDirectory: '../__coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@fc/micro\\-videos/(.*)$': `${fc_micro_videos_path}/$1`,
    '#seedwork/(.*)$': `${fc_micro_videos_path}/@seedwork/$1`,
    '#category/(.*)$': `${fc_micro_videos_path}/category/$1`,
    '#cast-member/(.*)$': `${fc_micro_videos_path}/cast-member/$1`,
  },
  setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};