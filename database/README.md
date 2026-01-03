# Database Directory

SQL schema files for the Supabase PostgreSQL database.

## Structure

```
database/
├── supabase-tables.sql       # Main database schema
└── add-membership-tier.sql   # Membership tier migration
```

## Files

### supabase-tables.sql
Complete database schema including:
- User profiles table
- Membership applications
- Document library
- Recordings catalog
- Peer review submissions
- Admin audit logs

### add-membership-tier.sql
Migration script for adding membership tier functionality:
- Adds `membership_tier` column
- Creates tier enum type
- Updates existing user records

## Database Architecture

The application uses Supabase which provides:
- **PostgreSQL** - Primary database
- **Auth** - User authentication (separate from app tables)
- **Row Level Security** - Access control policies
- **Realtime** - Live data subscriptions (if needed)

## User Data Model

User authentication is handled by Supabase Auth. Application-specific user data is stored in `user_metadata`:

```json
{
  "full_name": "Jane Smith",
  "organization": "County Health Department",
  "membership_tier": "affiliate",
  "role": "member"
}
```

### Membership Tiers
| Tier | Description |
|------|-------------|
| `public` | No account (anonymous visitors) |
| `affiliate` | Free community membership |
| `member` | Paid professional membership |

## Related Files

- `/migrations/` - Versioned database migrations
- `/docs/MEMBERSHIP_MODEL.md` - Membership tier documentation
- `/.env.local` - Database connection credentials
