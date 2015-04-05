function mixins(type) {
  if ('ellipsis' == type) {
    return {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }
  }

  return type;
}

