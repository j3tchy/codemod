// npm install jscodeshift (https://github.com/facebook/jscodeshift)

/**
 * package.json
 * 
 * scripts: {
 *  "codemod": jscodeshift -t ./codemod.js ./src/*.js<files-to-update> -d<dry-run> -p<print-to-console>"
 * }
 */

export default (fileInfo, api) => {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .find(j.ImportDeclaration, {
            source: {
                type: "Literal",
                value: "@halo/components",
            }
        })
        .replaceWith(nodePath => {
            const { node } = nodePath;

            // node represents the key used within .find()
            node.source.value = "@jetchy/components";
            node.source.raw = "'@jetchy/components'";

            return node;
        })
        .toSource();
}