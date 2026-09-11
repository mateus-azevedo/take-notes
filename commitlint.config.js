/**
 * With @commitlint/config-conventional, you will have types like:
 *
 * feat      new feature
 * fix       bug fix
 * docs      documentation
 * style     formatting, no code change
 * refactor  refactoring
 * test      adding tests
 * chore     maintenance/configuration
 * build     changes that affect the build system or external dependencies
 * ci        CI/CD
 * perf      performance improvement
 * revert    reverts a previous commit
 */
export default {
  extends: ["@commitlint/config-conventional"],
};
