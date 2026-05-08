import { describe, it, expect, vi } from "vitest";
import User, { IUserConstructorProps } from "../User";
import { RoleEnum } from "../RoleEnum";
import Username from "../../value-object/Username";
import Email from "../../value-object/Email";
import AvatarURL from "../../value-object/AvatarURL";
import { ValidationError } from "@/infrastructure/Result";

describe("User Entity", () => {
  const createMocks = () => ({
    username: Username.create("test_user_long_enough"),
    email: Email.create("test@example.com"),
    avatar: AvatarURL.create("https://example.com/avatar.png"),
  });

  const defaultProps = (): IUserConstructorProps => {
    const { username, email, avatar } = createMocks();
    return {
      id: "123",
      username,
      email,
      avatarUrl: avatar,
      role: RoleEnum.USER,
    };
  };

  describe("Role Management", () => {
    it("should allow an admin to change a user's role", () => {
      const admin = new User({
        ...defaultProps(),
        id: "admin",
        role: RoleEnum.ADMIN,
      });
      const targetUser = new User(defaultProps());

      targetUser.setRoleTo(admin, RoleEnum.JUDGE);
      expect(targetUser.role).toBe(RoleEnum.JUDGE);
    });

    it("should throw ValidationError if a non-admin tries to change roles", () => {
      const userA = new User({ ...defaultProps(), id: "userA" });
      const userB = new User({ ...defaultProps(), id: "userB" });

      expect(() => userB.setRoleTo(userA, RoleEnum.ADMIN)).toThrow(
        ValidationError,
      );
      expect(() => userB.setRoleTo(userA, RoleEnum.ADMIN)).toThrow(
        "Only admins can change roles",
      );
    });

    it("should throw if the user already has the target role", () => {
      const admin = new User({ ...defaultProps(), role: RoleEnum.ADMIN });
      const targetUser = new User({ ...defaultProps(), role: RoleEnum.USER });

      expect(() => targetUser.setRoleTo(admin, RoleEnum.USER)).toThrow(
        "User already has this role",
      );
    });
  });

  describe("Username Changes", () => {
    it("should change username when valid and unique", async () => {
      const user = new User(defaultProps());
      const checkUnique = vi.fn().mockResolvedValue(true);

      await user.changeUsername("new_valid_username", checkUnique);

      expect(user.username.value).toBe("new_valid_username");
      expect(checkUnique).toHaveBeenCalledWith("new_valid_username");
    });

    it("should throw if username is too short", async () => {
      const user = new User(defaultProps());
      const checkUnique = vi.fn();

      await expect(user.changeUsername("short", checkUnique)).rejects.toThrow(
        "between 8 and 50 characters",
      );
    });

    it("should throw if username starts with underscore", async () => {
      const user = new User(defaultProps());
      const checkUnique = vi.fn();

      await expect(
        user.changeUsername("_invalidname", checkUnique),
      ).rejects.toThrow("cannot start with an underscore");
    });

    it("should throw if username is not unique", async () => {
      const user = new User(defaultProps());
      const checkUnique = vi.fn().mockResolvedValue(false);

      await expect(
        user.changeUsername("already_taken_name", checkUnique),
      ).rejects.toThrow("already taken");
    });
  });

  describe("Profile Completion Status", () => {
    it("should return false for isProfileFull if additional data is missing", () => {
      const user = User.create(
        "1",
        Email.create("a@b.com"),
        Username.create("user_name"),
        AvatarURL.create("https://picsum.photos/200/300"),
      );
      expect(user.isProfileFull).toBe(false);
    });

    it("should return true when contacts, age, and fullName are present", () => {
      const user = new User({
        ...defaultProps(),
        contacts: { telegram: "@test", discord: "test#123" },
        age: { value: 20, birthDay: new Date() },
        fullName: {
          value: "John Doe",
          firstName: "John",
          lastName: "Doe",
          surName: "",
        },
      });
      expect(user.isProfileFull).toBe(true);
    });
  });

  describe("Data Integrity", () => {
    it("should clear additional data correctly", () => {
      const user = new User({
        ...defaultProps(),
        age: { value: 25, birthDay: new Date() },
      });

      user.clearAdditionData();

      expect(user.age).toBeNull();
      expect(user.contacts.telegram).toBe("");
      expect(user.isProfileFull).toBe(false);
    });

    it("should correctly update partial contacts", () => {
      const user = new User(defaultProps());
      user.updateContacts({ telegram: "@new_tele" });

      expect(user.contacts.telegram).toBe("@new_tele");
      expect(user.contacts.discord).toBe(""); // remains unchanged
    });
  });
});
