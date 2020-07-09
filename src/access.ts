export default function(initialState: { userId: any; role: any }) {
  const { userId, role } = initialState;

  return {
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: (foo: { ownerId: any }) => {
      console.log(foo);
      return foo.ownerId === userId;
    },
  };
}
