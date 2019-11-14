export const routes = [
  {
    name: 'landing',
    domain: 'luuk.gg',
  },
  {
    name: 'about',
    domain: 'luuk.gg',
  },
];

export const nameToPath = name => {
  const section = routes.filter(s => s.name === name)[0];
  return section ? `/${name}` : '/';
};

export const nextComponent = name => {
  let result;
  routes.some((section, sectionIndex) => {
    if (section.components) {
      return section.components.some((component, componentIndex) => {
        if (component === name) {
          result = section.components[componentIndex + 1];
          if (!result) {
            const nextSection = routes[sectionIndex + 1];
            if (nextSection) {
              if (nextSection.components) {
                [result] = nextSection.components;
              } else {
                result = nextSection.name;
              }
            }
          }
        }
        return result;
      });
    }
    if (section.name === name) {
      const nextSection = routes[sectionIndex + 1];
      if (nextSection) {
        if (nextSection.components) {
          [result] = nextSection.components;
        } else {
          result = nextSection.name;
        }
      }
    }
    return false;
  });
  return result;
};

export const previousComponent = name => {
  let result;
  routes.some((section, sectionIndex) => {
    if (section.components) {
      return section.components.some((component, componentIndex) => {
        if (component === name) {
          result = section.components[componentIndex - 1];
          if (!result) {
            const priorSection = routes[sectionIndex - 1];
            if (priorSection) {
              if (priorSection.components) {
                result =
                  priorSection.components[priorSection.components.length - 1];
              } else {
                result = priorSection.name;
              }
            }
          }
        }
        return result;
      });
    }
    if (section.name === name) {
      const priorSection = routes[sectionIndex - 1];
      if (priorSection) {
        if (priorSection.components) {
          result = priorSection.components[priorSection.components.length - 1];
        } else {
          result = priorSection.name;
        }
      }
    }
    return false;
  });
  return result;
};
