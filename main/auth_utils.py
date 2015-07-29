def is_employee(user):
    return user.groups.filter(name='employees').exists() or user.is_superuser